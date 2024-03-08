import { PostType } from "../../types/interfaces";
import http from "./HttpService";

export function getAllPosts(start = 0, end = 10) {
    return http.get(`/posts/?_start=${start}&_end=${end}`)
}
export function getuserById(id: number) {
    return http.get(`/users/${id}`)
}

export function addNewPost(post: PostType) {
    const token = 'Secure Token'
    const header = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    return http.post('/posts', post, header)
}

export function deletePostById(id: number) {
    return http.delete(`/posts/${id}`)
}

export function updatePostById(id: number, updatedItem: {}) {
    return http.put(`/posts/${id}/`, updatedItem)
}