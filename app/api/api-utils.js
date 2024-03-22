export const getData = async (url) => {
    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            throw new Error("Ошибка получения данных");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
};



export const isResponseOk = (response) => {
    return !(response instanceof Error);
};


const normalizeDataObject = (obj) => {
    return {
        ...obj,
        category: obj.categories,
        users: obj.users_permissions_users,

    }
}


export const normalizeData = (data) => {
    return data.map((item) => {
        return normalizeDataObject(item)
    })
}


export const getNormalizedGamesDataById = async (url, id) => {
    const data = await getData(`${url}/${id}`)
    return isResponseOk(data) ? normalizeDataObject(data) : data;
}

export const getNormalizedGamesDataByCategory = async (url, category) => {
    try {
        const data = await getData(`${url}?categories.name=${category}`);
        if (!data.length) {
            throw new Error("Нет игр в категории");
        }
        return isResponseOk(data) ? normalizeData(data) : data;
    } catch (error) {
        return error;
    }
};


export const authorize = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (response.status !== 200) {
            throw new Error("Ошибка авторизации");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

export const getMe = async (url, jwt) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${jwt}` },
        });
        if (response.status !== 200) {
            throw new Error("Ошибка получения данных");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

export const setJWT = (jwt) => {
    licalStorage.setItem("jwt", jwt);
};
export const getJWT = () => {
    return localStorage.getItem("jwt");
};
export const removeJWT = () => {
    localStorage.removeItem("jwt");
};



export const vote = async (jwt) => {
    try {
        const response = await fetch(
            "https://api-code-2.practicum-team.ru/games/6", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                users_permissions_users: [1, 2, 3, 5]
            }),
        });
        if (response.status !== 200) {
            throw new Error("Ошибка авторизации");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};


export const checkIfUsersVoted = (users, id) =>{
    return users.find((user) => user.id === id);
};