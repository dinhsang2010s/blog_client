export const CATEGORIES = "/api/categories";
export const ARTICLES = "/api/articles";
export const USERS = "/api/users";
export const AUTH = "/api/auth";

export const WP_CONTENTS = "/api/wp-contents";
export const URI_API_WP_CONTENTS = `${process.env.NEXT_PUBLIC_DB_HOST}${WP_CONTENTS}`;
export const UPLOAD_IMAGE_TOPIC = `${URI_API_WP_CONTENTS}/upload`;
