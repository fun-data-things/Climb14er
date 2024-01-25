from app.database import db

class Trail(db.Model):
    __tablename__ = "trails"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200))
    difficulty_rating = db.Column(db.Integer)
    miles = db.Column(db.Float)
    elevation_gain = db.Column(db.Integer)
    description = db.Column(db.String(1000))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    def __repr__(self):
        return f'<Trail "{self.name}">'
    
    def to_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}