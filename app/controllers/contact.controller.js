const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Ten khong the bo trong"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Da xay ra loi khi tao nhan vien")
        );
    }
};



exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Da xay ra loi khi tim nhan vien")
        );
    }
    return res.send(documents);
};



exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Khong tim thay nhan vien"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, 'Loi khi tim nhan vien id= ' + req.params.id + '')
        );
    }
};



exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Du lieu cap nhat khong the bo trong"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Khong tim thay nhan vien"));
        }
        return res.send({ massage: "Nhan vien da cap nhat thanh cong" });
    } catch (error) {
        return next(
            new ApiError(500, 'Loi khi cap nhat nhan vien id=' + req.params.id + '')
        );

    }
};




exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Khong tim thay nhan vien"));
        }
        return res.send({ massage: "Xoa nhan vien thanh cong" });
    } catch (error) {
        return next(
            new ApiError(500, 'Khong the xoa nhan vien id=' + req.params.id + '')
        );

    }
};



exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll();
        return res.send({ massage: `${deleteCount} nhan vien da duoc xoa thanh cong`, });
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(500, "Loi khi xoa tat ca nhan vien")
        );

    }
};


exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "Loi khi tim kiem nhan vien duoc yeu thich")
        );

    }
};