import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPhoto = (i) => { 
  return {
    id: i,
    title: namor.generate({ words: 2, numbers: 0 }),
    previewUrl: "https://hips.hearstapps.com/hmg-prod/images/vibrant-pink-and-white-summer-flowering-cosmos-royalty-free-image-1653499726.jpg?crop=0.66541xw:1xh;center,top&resize=120:*",
    url: "https://hips.hearstapps.com/hmg-prod/images/vibrant-pink-and-white-summer-flowering-cosmos-royalty-free-image-1653499726.jpg?crop=0.66541xw:1xh;center,top&resize=980:*",
  }
}

const newAlbum = (i) => {
  const photoData = makePhotoData(Math.ceil(Math.random() * 10))

  return {
    id: i,
    title: namor.generate({ words: 2, numbers: 0 }),
    userName: namor.generate({ words: 2, numbers: 0 }),
    numberPhotos: photoData.length,
    photos: photoData
  }
}

export function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, i) => {
      return {
        ...newAlbum(i),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

export function makePhotoData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map((d, i) => {
      return {
        ...newPhoto(i),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
