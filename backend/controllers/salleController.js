import Salle from "../models/Salle.js";

// GET - Toutes les salles
export const getAllSalles = async (req, res) => {
  try {
    const salles = await Salle.findAll({
      order: [["name", "ASC"]],
    });
    res.status(200).json({
      success: true,
      count: salles.length,
      data: salles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET - Salle par ID
export const getSalleById = async (req, res) => {
  try {
    const salle = await Salle.findByPk(req.params.id);
    if (!salle) {
      return res.status(404).json({
        success: false,
        error: "Salle non trouvée",
      });
    }
    res.status(200).json({
      success: true,
      data: salle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST - Créer une salle
export const createSalle = async (req, res) => {
  try {
    const { name, capacity, features } = req.body;

    if (!name || !capacity) {
      return res.status(400).json({
        success: false,
        error: "Le nom et la capacité sont obligatoires",
      });
    }

    if (capacity < 10) {
      return res.status(400).json({
        success: false,
        error: "La capacité minimale est de 10 places",
      });
    }

    const salle = await Salle.create({
      name,
      capacity,
      features: features || [],
    });

    res.status(201).json({
      success: true,
      data: salle,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        error: "Une salle avec ce nom existe déjà",
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT - Modifier une salle
export const updateSalle = async (req, res) => {
  try {
    const salle = await Salle.findByPk(req.params.id);
    if (!salle) {
      return res.status(404).json({
        success: false,
        error: "Salle non trouvée",
      });
    }

    if (req.body.capacity && req.body.capacity < 10) {
      return res.status(400).json({
        success: false,
        error: "La capacité minimale est de 10 places",
      });
    }

    await salle.update(req.body);

    res.status(200).json({
      success: true,
      data: salle,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        error: "Une salle avec ce nom existe déjà",
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE - Supprimer une salle
export const deleteSalle = async (req, res) => {
  try {
    const salle = await Salle.findByPk(req.params.id);
    if (!salle) {
      return res.status(404).json({
        success: false,
        error: "Salle non trouvée",
      });
    }

    await salle.destroy();

    res.status(200).json({
      success: true,
      message: "Salle supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
