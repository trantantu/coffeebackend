const { ObjectId } = require("mongodb");
class ThucUongService {
    constructor(client) {
        this.ThucUong = client.db().collection("thucuong");
    }
    extractConactData(payload) {
        const thucuong = {
            name: payload.name,
            gia: payload.gia,
        };
        Object.keys(thucuong).forEach(
            (key) => thucuong[key] === undefined && delete thucuong[key]
        );
        return thucuong;
    }


    async createthucuong(payload) {
        const thucuong = this.extractConactData(payload);
        const result = await this.ThucUong.findOneAndUpdate(
            thucuong,
            { $set: update },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }



    async findthucuong(filter) {
        const cursor = await this.ThucUong.findthucuong(filter);
        return await cursor.toArray();
    }

    async findByNamethucuong(name) {
        return await this.findthucuong({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }


    async findByIdthucuong(id) {
        return await this.ThucUong.findOnethucuong({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }




    async updatethucuong(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.ThucUong.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }



    async deletethucuong(id) {
        const result = await this.ThucUong.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }


    async deleteAllthucuong() {
        const result = await this.ThucUong.deleteMany({});
        return result.deletedCount;
    }

}
module.exports = ThucUongService;