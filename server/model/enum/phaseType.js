/**
 * Phases of the game
 */
const PhaseTypes = {
    /**
     * Users are in the lobby
     */
    INSIDE_LOBBY: "Inside Lobby",
    /**
     *  A phase in which a user draws a received sentence.
     */
    DRAW: "Draw",
    /**
     *  A phase in which a user writes a random sentence or a sentence about a received drawing.
     */
    SENTENCE: "Sentence",
    /**
     * A phase in which all users see the results of the game.
     */
    SHOWING_REPORT: "Showing Report"
};

module.exports = PhaseTypes;
