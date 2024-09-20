const RefreshToken = require('../models/refreshToken.model');

class TokenService {
  async saveRefreshToken(userId, token) {
    await RefreshToken.create({ userId, token });
  }

  async removeRefreshToken(token) {
    await RefreshToken.destroy({ where: { token } });
  }

  async findRefreshToken(token) {
    return await RefreshToken.findOne({ where: { token } });
  }
}

module.exports = new TokenService();
