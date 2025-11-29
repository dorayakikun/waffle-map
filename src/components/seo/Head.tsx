import * as React from "react";
import { Helmet } from "react-helmet";

type Props = {
    meshcodes?: string;
};

export const Head = ({ meshcodes }: Props) => {
    // NOTE: This URL is hypothetical as per the implementation plan.
    // In a real scenario with server-side generation, this would point to an endpoint
    // that generates the image. For now, we update the meta tag client-side.
    const ogImage = meshcodes
        ? `https://waffle-map.netlify.com/api/og?meshcodes=${meshcodes}`
        : "https://waffle-map.netlify.com/images/apple-touch-icon.png";

    return (
        <Helmet>
            <meta property="og:image" content={ogImage} />
            <meta name="twitter:image" content={ogImage} />
        </Helmet>
    );
};
