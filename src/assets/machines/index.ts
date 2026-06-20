import image from './image.png'
import image1 from './image1.png'
import screenshot1 from './Screenshot_1.png'
import screenshot2 from './Screenshot_2.png'
import screenshot3 from './Screenshot_3.png'
import screenshot4 from './Screenshot_4.png'
import screenshot5 from './Screenshot_5.png'
import screenshot6 from './Screenshot_6.png'
import screenshot7 from './Screenshot_7.png'
import screenshot8 from './Screenshot_8.png'
import screenshot9 from './Screenshot_9.png'
import screenshot10 from './Screenshot_10.png'
import screenshot11 from './Screenshot_11.png'
import screenshot12 from './Screenshot_12.png'
import screenshot13 from './Screenshot_13.png'
import screenshot14 from './Screenshot_14.png'
import screenshot15 from './Screenshot_15.png'
import screenshot16 from './Screenshot_16.png'

export const MACHINE_IMAGES = [
  image,
  image1,
  screenshot1,
  screenshot2,
  screenshot3,
  screenshot4,
  screenshot5,
  screenshot6,
  screenshot7,
  screenshot8,
  screenshot9,
  screenshot10,
  screenshot11,
  screenshot12,
  screenshot13,
  screenshot14,
  screenshot15,
  screenshot16,
]

export function getMachineImagesForProducts(productCount: number) {
  const images = [...MACHINE_IMAGES]

  while (images.length < productCount) {
    images.push(MACHINE_IMAGES[images.length - MACHINE_IMAGES.length])
  }

  return images.slice(0, productCount)
}
