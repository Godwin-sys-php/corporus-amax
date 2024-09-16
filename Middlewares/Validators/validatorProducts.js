const Brands = require("../../Models/Brands");
const ProductsCategory = require("../../Models/ProductsCategory");

module.exports = async (req, res, next) => {
  try {
    const isNumber = (value) => {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
    const isBoolean = (value) => {
      return value === true || value === false;
    }
    const {
      name,
      categoryId,
      brandId,
      barcode,
      unit,
      isSellable,
      isVersatile,
      price,
      inStock,
      buyPrice,
    } = req.body;
    if (!barcode) {
      return res.status(400).json({ error: true, message: "Champs invalides" });
    }
    if (!isBoolean(isSellable) || !isBoolean(isVersatile)) {
      return res.status(400).json({ error: true, message: "Champs invalides" });
    }
    if (isSellable) {
      if (isVersatile) {
        if (!name || !categoryId || !unit || !isNumber(price) || !isNumber(buyPrice)) {
          return res.status(400).json({ error: true, message: "Champs invalides" })
        } else {
          const category = await ProductsCategory.find({ id: categoryId });
          const brand = await Brands.find({ id: brandId });
          if (brand.length === 0) {
            return res.status(400).json({ error: true, message: "Marque invalide" });
          }
          if (category.length === 0) {
            return res.status(400).json({ error: true, message: "Catégorie invalide" });
          }
          req.body.inStock = null;
          req._pCategory = category[0];
          req._brand = brand[0];
          return next();
        }
      } else {
        if (!name || !categoryId || !unit || !isNumber(price) || !isNumber(buyPrice) || !isNumber(inStock)) {
          return res.status(400).json({ error: true, message: "Champs invalides" })
        } else {
          const category = await ProductsCategory.find({ id: categoryId });
          const brand = await Brands.find({ id: brandId });
          if (brand.length === 0) {
            return res.status(400).json({ error: true, message: "Marque invalide" });
          }
          if (category.length === 0) {
            return res.status(400).json({ error: true, message: "Catégorie invalide" });
          }
          req._pCategory = category[0];
          req._brand = brand[0];
          return next();
        }
      }
    } else {
      if (isVersatile) {
        if (!name || !categoryId || !unit || !isNumber(buyPrice)) {
          return res.status(400).json({ error: true, message: "Champs invalides" })
        } else {
          const category = await ProductsCategory.find({ id: categoryId });
          const brand = await Brands.find({ id: brandId });
          if (brand.length === 0) {
            return res.status(400).json({ error: true, message: "Marque invalide" });
          }
          if (category.length === 0) {
            return res.status(400).json({ error: true, message: "Catégorie invalide" });
          }
          req.body.inStock = null;
          req.body.price = null;
          req._pCategory = category[0];
          req._brand = brand[0];
          return next();
        }
      } else {
        if (!name || !categoryId || !unit || !isNumber(buyPrice) || !isNumber(inStock)) {
          return res.status(400).json({ error: true, message: "Champs invalides" })
        } else {
          const category = await ProductsCategory.find({ id: categoryId });
          const brand = await Brands.find({ id: brandId });
          if (brand.length === 0) {
            return res.status(400).json({ error: true, message: "Marque invalide" });
          }
          if (category.length === 0) {
            return res.status(400).json({ error: true, message: "Catégorie invalide" });
          }
          req.body.price = null;
          req._pCategory = category[0];
          req._brand = brand[0];
          return next();
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
}