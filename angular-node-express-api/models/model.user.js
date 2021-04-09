class UserModel
{
	constructor(uid, pseudo_name, email, password)
	{
		this.uid = uid;
		this.pseudo_name = pseudo_name;
		this.email = email;
		this.password = password;
	}
}

module.exports = UserModel;