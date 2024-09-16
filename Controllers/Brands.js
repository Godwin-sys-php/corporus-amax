const Brands = require("../Models/Brands");
const moment = require("moment");

exports.createOneBrand = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: true, message: "Champs invalides" });
    }
    const now = moment();
    const toInsert = {
      name: req.body.name,
    };
    
    await Brands.insertOne(toInsert);
    const brands = await Brands.findAll();
    
    return res.status(200).json({ success: true, message: "Marque créé", brands });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
}

exports.updateOneBrand = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: true, message: "Champs invalides" });
    }
    const toSet = {
      name: req.body.name,
    }
    await Brands.update(toSet, { id: req.params.id });
    const brands = await Brands.findAll();
    return res.status(200).json({ success: true, message: "Marque modifiée", brands });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
}

exports.deleteOneBrand = async (req, res) => {
  try {
    await Brands.delete({ id: req.params.id });
    const brands = await Brands.findAll();
    return res.status(200).json({ success: true, message: "Marque supprimée", brands });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
}

exports.getOneBrand = async (req, res) => {
  try {
    const brand = await Brands.find({ id: req.params.id });
    return res.status(200).json({ success: true, data: brand[0], });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
}

exports.getAllBrand = async (req, res) => {
  try {
    const brands = await Brands.findAll();
    return res.status(200).json({ success: true, data: brands, });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
}