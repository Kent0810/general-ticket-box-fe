export const genre = [
    {
      "id": 1,
      "name": "Movie",
    },
    {
      "id": 2,
      "name": "Concert",
    },
    {
      "id": 3,
      "name": "Fan Meet",
    },
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    },
    {
      "id": 999,
      "name": "Others"
    }
  ]
export const getGenreFromGenreId = (genreId: number) => {
  const foundGenre = genre.find((item) => item.id === genreId);
  
  if (foundGenre) {
    return foundGenre.name;
  } else {
    return null;
  }
}

export const getGenreIdFromGenreName = (genreName: string) => {
  const foundGenre = genre.find((item) => item.name.toLowerCase() === genreName.toLowerCase());

  if (foundGenre) {
    return foundGenre.id;
  } else {
    return null;
  }
}