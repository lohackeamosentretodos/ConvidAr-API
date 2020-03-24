const { setGoal } = require("./fundacion.service");

module.export = {
    setGoal: (req, res) => {
        const data = req.body;
        const id_fundacion = req.params.id_fundacion;
        const estado = req.params.estado;
        const monto = req.params.monto;
        setGoal(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }
}