from app.database import db

class Trail(db.Model):
    __tablename__ = "trails"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(300))
    route = db.Column(db.String(300))
    range = db.Column(db.String(200))
    difficulty_class = db.Column(db.Integer)
    mileage = db.Column(db.Float)
    elevation_gain = db.Column(db.Integer)
    trailhead = db.Column(db.String(200))
    google_maps = db.Column(db.String(300))
    distance_to_denver = db.Column(db.Integer)
    kind_of_trip = db.Column(db.String(200))
    trip_description = db.Column(db.String(1500))
    next_summit_route = db.Column(db.String(300))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    notes = db.Column(db.String(1500))

    def __repr__(self):
        return f'<Trail "{self.name}">'
    
    def to_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}