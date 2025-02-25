import App from "./App"
import {render, screen} from "@testing-library/react";

describe("Given : que l'utilisateur accède à l'application", ()=> {
    describe("When : à l'initialisation",  ()=> {
        test.only("Then : mon application s'affiche sur la vue principale", async ()=> {
            // J'affiche mon composant à l'écran
            render(<App/>);

            // Le titre Boutique s'affiche
            const titleNode = await screen.findByRole("heading", { name: 'Boutique' });
            // const titleNode = await screen.findByText('Boutique');
            expect(titleNode).toBeInTheDocument();
        })
    })
})