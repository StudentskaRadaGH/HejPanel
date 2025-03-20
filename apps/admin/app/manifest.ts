import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "HejPanel",
        short_name: "HejPanel",
        description:
            "Nástroj vyvinut a spravovaný Studentskou radou Gymnázia Hejčín sloužící k rychlé a efektivní distribuci informací mezi žáky a zaměstnance školy.",
        start_url: "/",
        orientation: "portrait",
        display: "standalone",
        theme_color: "#001C2E",
        background_color: "#001C2E",
        icons: [
            {
                src: "/icons/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
        screenshots: [
            {
                src: "/icons/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/icons/icon-512.png",
                sizes: "512x512",
                type: "image/png",
                form_factor: "wide",
            },
        ],
    };
}
