module.exports = class Game {
	constructor(id, currentWord, currentArtist, timeLeftToGuess) {
		this.id = id;
		this.currentWord = currentWord;
		this.currentArtist = currentArtist;
		this.timeLeftToGuess = timeLeftToGuess;
	}
};
