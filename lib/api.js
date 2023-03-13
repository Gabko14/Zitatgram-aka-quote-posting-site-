const URL = "http://localhost:3001/"

export async function login({ email, password }) {
    const response = await fetch(`${URL}login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function register({ email, password }) {
    const response = await fetch(`${URL}register`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getAllPosts() {
    const response = await fetch(`${URL}quotes`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getPostById(id) {
    const response = await fetch(`${URL}quotes/${id}`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function createPost(post, token) {
    const response = await fetch(`${URL}quotes`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(post)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function updatePost(quote, token) {
    console.log(quote)
    const response = await fetch(`${URL}quotes/${quote.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(quote)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function deletePost(id, token) {
    const response = await fetch(`${URL}quotes/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }
}

export async function deleteComment(quoteId, commentId, token) {
    const response = await fetch(`${URL}quotes/${quoteId}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }
}