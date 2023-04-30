const express = require("express")
const { getAllSongs, getOneSong, createSong, deleteSong, updateSong } = require("../queries/songs.js");
const songs = express.Router()


songs.get('/', async (req, res) => {
    const allSongs =  await getAllSongs();
    console.log(allSongs)
    if(allSongs[0]){
        res.status(200).json(allSongs)
    } else {
        res.status(500).json({error: "server error"});
    }
});


songs.get('/:id', async (req, res) => {
    const { id } = req.params;
    const song = await getOneSong(id);
    if (!song.error) {
        res.status(200).json(song);
    } else if (song.error.code === 0) {
        res.status(404).json({ error: "song not found"})
    } else {
        res.status(500).json({error: "server error"})
    }
});


songs.post('/', async (req, res) => {
    const { name, artist, album, time, is_favorite } = req.body;
    const newSong = await createSong({name, artist, album, time, is_favorite});
    if (!newSong.error) {
        res.status(201).json(newSong)
    } else {
        res.status(500).json({error: "server error"})
    }
})

songs.put('/:id', async (req, res) => {
    const song = req.body;
    const { id } = req.params;
    const updatedSong = await updateSong(id, song)
    res.status(200).json(updatedSong)
})


songs.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedSong = await deleteSong(id)
    if (deletedSong.id){
        res.status(201).json(deletedSong)
    }else {
        res.status(404).json("Song not found")
    }
})

module.exports = songs