const mongoose = require('mongoose');

const AvatarUserSchema = new mongoose.Schema(
  {
    name: String,
    size: Number,
    key: String,
    url: {
      type: String,
      default:
        'https://res.cloudinary.com/apinodeteste/image/upload/v1562595741/avatar/person_avatar_gcuj7q.jpg',
    },
    public_id: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('AvatarUser', AvatarUserSchema);
