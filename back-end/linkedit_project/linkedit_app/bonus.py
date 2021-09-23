import json 
import time
import numpy as np
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def JSON_to_Features(JSON_DATA, get_comments=True):
    # convert json to python
    # data = json.loads(JSON_DATA)
    data = JSON_DATA

    # get the text from the posts
    posts = []
    texts = ""

    for post in data:
        texts += post["content"]["text"]
        if get_comments:
            for comment in post["comments"]:
                texts += comment["content"]["text"]
        posts.append(texts)
        texts = ""

    # vectorize them
    tfidf_vectorizer = TfidfVectorizer(ngram_range=(1, 2), max_features=500)
    count_vectorizer = CountVectorizer(ngram_range=(1, 2), max_features=500)
    tfidf_matrice = tfidf_vectorizer.fit_transform(posts).todense()
    count_matrice = count_vectorizer.fit_transform(posts).todense()

    # expand matrices if features are not enough
    if tfidf_matrice.shape[1] < 500:
        zero_fill = np.zeros((tfidf_matrice.shape[0], 500 - tfidf_matrice.shape[1]))
        tfidf_matrice = np.concatenate((tfidf_matrice, zero_fill), axis=1)

    if count_matrice.shape[1] < 500:
        zero_fill = np.zeros((count_matrice.shape[0], 500 - count_matrice.shape[1]))
        count_matrice = np.concatenate((count_matrice, zero_fill), axis=1)

    feature_matrice = np.concatenate((tfidf_matrice, count_matrice), axis=1)

    return feature_matrice


def norm_fro(x):
    return np.linalg.norm(x, ord="fro")


def isNaN(number):
    return number != number


def MF(X, k, lamda, epsilon, print_loss=False):
    # start with random non negative matrixes
    W = np.random.rand(X.shape[0], k)
    W = np.absolute(W)
    C = np.random.rand(k, X.shape[1])
    C = np.absolute(C)

    i = 0
    C_loss = []
    W_loss = []
    rebuild_loss = []
    loss = []

    if print_loss:
        print("\n\n")
        print("_" * 100)
        print(" " * 23 + "Reg-NMF K: %d epsilon: %f lamda %f" % (k, epsilon, lamda))
        print("_" * 100)

    start_time = time.time()

    while (True):

        # calcualate new matrixes with the modified gradient step
        # and also with the derivative of the regularizer
        W_step = W / (((W @ C) @ C.T) + lamda * W)
        W_new = np.multiply(W_step, (X @ C.T))

        C_step = C / (((W_new.T @ W_new) @ C) + lamda * C)
        C_new = np.multiply(C_step, (W_new.T @ X))

        # get the relative error
        # error = ( np.linalg.norm(X - W_new@C_new, ord="fro")**2 + lamda*np.linalg.norm(W_new, ord="fro")**2 + lamda*np.linalg.norm(C_new, ord="fro")**2 - np.linalg.norm(X - W@C, ord="fro")**2 - lamda*np.linalg.norm(W, ord="fro")**2 - lamda*np.linalg.norm(C, ord="fro")**2) / np.linalg.norm(X, ord="fro")**2
        error = (norm_fro(X - (W_new @ C_new)) ** 2 - norm_fro(X - (W @ C)) ** 2) / norm_fro(X) ** 2
        error = np.abs(error)

        C = C_new
        W = W_new

        # get losses
        wl = norm_fro(W) ** 2
        cl = norm_fro(C) ** 2
        rl = norm_fro(X - W @ C) ** 2
        l = rl + wl + cl

        W_loss.append(wl)
        C_loss.append(cl)
        rebuild_loss.append(rl)
        loss.append(l)
        i += 1

        if print_loss:
            print("[Loss: %.6f]  [Rebuild loss: %.6f]  [W loss: %.6f]  [C loss:  %.6f]  [Error: %.6f]" % (
            l, rl, wl, cl, error))

        if error < epsilon or isNaN(error) or i > 10:
            end_time = time.time()
            total_time = end_time - start_time

            if print_loss:
                print("Minimun error reached: ", l)
                print("Iterations: ", i)
                print("Time: ", total_time)

                fig, ax = plt.subplots(1, figsize=(7, 5))

                ax.plot(loss)
                ax.plot(rebuild_loss)
                ax.plot(W_loss)
                ax.plot(C_loss)
                ax.set_title("Cost over iterations K: " + str(k) + " epsilon: " + str(epsilon))
                ax.set_ylabel("Object function values")
                ax.set_xlabel("Iterations")
                ax.legend(["Total cost", "Rebuild cost", "W cost", "C cost"])
                plt.show()

            return loss[-1], rl, wl, cl, total_time, i, W, C


def get_closest_vectors_order(v1, v2):
    distances = cosine_similarity(v1, v2)
    return (-distances).T.argsort()[0]


def get_recommendations(OTHER_USERS_JSON_DATA, MINE_USER_JSON_DATA, get_comments=True):
    oher_users_posts = JSON_to_Features(OTHER_USERS_JSON_DATA, get_comments)
    mine_user_posts = JSON_to_Features(MINE_USER_JSON_DATA, get_comments)

    # get compressed vectors of features
    oher_users_posts_compressed = MF(oher_users_posts, k=10, lamda=0.0001, epsilon=0.01, print_loss=False)[-2]
    mine_user_posts_compressed = MF(mine_user_posts, k=10, lamda=0.0001, epsilon=0.01, print_loss=False)[-2]

    # find the mean average of the my user feature
    mine_user_posts_compressed_average = mine_user_posts_compressed.mean(axis=0)

    # get the closest vectors -> posts
    recommended_posts_order = get_closest_vectors_order(oher_users_posts_compressed, mine_user_posts_compressed_average)

    ordered_recommended_data = [post for _, post in sorted(zip(recommended_posts_order,OTHER_USERS_JSON_DATA))]
    return ordered_recommended_data
