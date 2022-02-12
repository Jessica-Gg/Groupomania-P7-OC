class WrongDataError extends Error {
    constructor(msg) {
        super(msg);
    }
}

module.export = WrongDataError;