// POST /characters ==> Create a new character
// PUT /characters/:id ==> Update a character by ID
// DELETE /characters/:id ==> Delete a character by ID
import express from "express";
import fs from "fs";
const app = express();

app.use(express.json());

function writeCharacters(data) {
    fs.writeFileSync("user.json", JSON.stringify(data, null, 2));
}


// GET /characters ==> Get all characters
app.get("/characters", (req, res) => {
    fs.readFile("user.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({error: "Failed to read characters"})
        }

        try {
            const characters = JSON.parse(data).characters;
            return res.status(200).json(characters);
        } catch (error) {
            return res.status(500).json({error: "Failed to parse characters"})
        }
    });
});

// GET /characters/:id ==> Get a character by ID
app.get("/characters/:id", (req, res) => {
    fs.readFile("user.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({error: "Failed to read characters"})
        }

        try {
            const characters = JSON.parse(data).characters;
            const id = parseInt(req.params.id);
            const character = characters.find(c => c.id === id);
            if (!character) {
                return res.status(404).json({ error: "Character not found" });
            }
            return res.status(200).json(character);
        } catch (error) {
            return res.status(500).json({error: "Failed to parse characters"})
        }
    });
})


