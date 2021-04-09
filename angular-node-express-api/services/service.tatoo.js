
const TatooModel = require("../models/model.tatoo");

class TatooService
{
	static create(data)
	{
		
		/* validation failed */
		let tatoo = new TatooModel(data.name, data.description, data.price);

		tatoo.uid = 'c' + counter++;

		tatoos[tatoo.uid] = tatoo;

		return tatoo;
	}

	static retrieve(uid)
	{
		if(tatoos[uid] != null)
		{
			return tatoos[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a TATOO by (uid:'+ uid +')');
		}
	}

	static update(uid, data)
	{
		if(tatoos[uid] != null)
		{
			const tatoo = tatoos[uid];
			
			Object.assign(tatoo, data);
		}
		else
		{
			throw new Error('Unable to retrieve a TATOO by (uid:'+ cuid +')');
		}
	}

	static delete(uid)
	{
		if(tatoos[uid] != null)
		{
			delete tatoos[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a TATOO by (uid:'+ cuid +')');
		}
	}

	static async listAll() {
		return await TatooModel.find()
	}
}

module.exports = TatooService;
