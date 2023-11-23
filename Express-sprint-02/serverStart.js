const serverStart = (app) => {
    const PORT = process.env.PORT || 5000;
    return app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

export default serverStart;