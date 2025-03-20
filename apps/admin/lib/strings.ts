import { User } from "types";

export const getRoleName = (user: { type: User["type"] }) => {
    switch (user.type) {
        case "suspended":
            return "Zablokovaný";
        case "user":
            return "Uživatel";
        case "admin":
            return "Administrátor";
        case "super-admin":
            return "Super administrátor";

        default:
            throw new Error(`Unknown user type: ${user.type}`);
    }
};
