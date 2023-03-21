export {}
export interface Comment {
    id?: number;
    user_id?:number;
    post_id?:number;
    content?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Post {
    id?: number;
    user_id?:number;
    title?: string;
    content?: string;
    created_at?: string;
    updated_at?: string;

    full_name?: string

}
export interface User {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    created_at?: string;
    updated_at?: string;
    full_name?: string
    subscription:string;

}
