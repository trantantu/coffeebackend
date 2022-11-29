const ThucUongService = require("../services/thucuong.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");



exports.createthucuong = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name cannot be empty"));
    }
    try {
        const thucuongService = new ThucUongService(MongoDB.client);
        const document = await thucuongService.createthucuong(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};



exports.findAllthucuong = async (req, res, next) => {
    let documents = [];
    try {
        const thucuongService = new ThucUongService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await thucuongService.findByNamethucuong(name);
        } else {
            documents = await thucuongService.findthucuong({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occcurred while retrieving contacts")
        );
    }
    return res.send(documents);
};



exports.findOnethucuong = async (req, res, next) => {
    try {
        const thucuongService = new ThucUongService(MongoDB.client);
        const document = await thucuongService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, 'Error retrieving contact with id= ' + req.params.id + '')
        );
    }
};



exports.updatethucuong = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update cannot be empty"));
    }
    try {
        const thucuongService = new ThucUongService(MongoDB.client);
        const document = await thucuongService.updatethucuong(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ massage: "Thuc uong cap nhat thanh cong" });
    } catch (error) {
        return next(
            new ApiError(500, 'Error updating contact with id=' + req.params.id + '')
        );

    }
};






exports.deletethucuong = async (req, res, next) => {
    try {
        const thucuongService = new ThucUongService(MongoDB.client);
        const document = await thucuongService.deletethucuong(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Khong tin thay thuc uong"));
        }
        return res.send({ massage: "Xoa thuc uong thanh cong" });
    } catch (error) {
        return next(
            new ApiError(500, 'Could not delete contact with id=' + req.params.id + '')
        );

    }
};




exports.deleteAllthucuong = async (_req, res, next) => {
    try {
        const thucuongService = new ThucUongService(MongoDB.client);
        const deleteCount = await thucuongService.deleteAllthucuong();
        return res.send({ massage: `${deleteCount} thuc uong duoc xoa thanh cong`, });
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(500, "Loi! Khong the xoa tat ca thuc uong")
        );

    }
};

