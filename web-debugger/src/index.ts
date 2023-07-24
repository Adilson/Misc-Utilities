import app from './app'

const port = process.env.PORT || 8101;
app.listen(port, (err: any) => {
    if (err)
        return console.log(err);

    return console.log(`server is listening on ${port}`);
});