import React from "react";
import { Topbar } from "../components/Topbar";
import { Recomend } from "../components/Recomend";

function MainPage() {
    return (
        <main className="flex-1 text-white">
            <Topbar />
            <Recomend />
        </main>
    );
}

export { MainPage };
