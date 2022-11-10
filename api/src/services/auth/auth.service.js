export const authService = (req,res) => {
    return res.status(200).send({text:"user authenticated"});
}