import p1_img from "./product_1.png";
import p2_img from "./product_2.png";
import p3_img from "./product_3.png";
import p4_img from "./product_4.png";
import p5_img from "./product_5.png";
import p6_img from "./product_6.png";
import p7_img from "./product_7.png";
import p8_img from "./product_8.png";
import p9_img from "./product_9.png";
import p10_img from "./product_10.png";
import p11_img from "./product_11.png";
import p12_img from "./product_12.png";
import p13_img from "./product_13.png";
import p14_img from "./product_14.png";
import p15_img from "./product_15.png";
import p16_img from "./product_16.png";
import p17_img from "./product_17.png";
import p18_img from "./product_18.png";
import p19_img from "./product_19.png";
import p20_img from "./product_20.png";
import p21_img from "./product_21.png";
import p22_img from "./product_22.png";
import p23_img from "./product_23.png";
import p24_img from "./product_24.png";
import p25_img from "./product_25.png";
import p26_img from "./product_26.png";
import p27_img from "./product_27.png";
import p28_img from "./product_28.png";
import p29_img from "./product_29.png";
import p30_img from "./product_30.png";
import p31_img from "./product_31.png";
import p32_img from "./product_32.png";
import p33_img from "./product_33.png";
import p34_img from "./product_34.png";
import p35_img from "./product_35.png";
import p36_img from "./product_36.png";

let all_product = [
  {
    id: 1,
    name: "Hoodie",
    category: "women",
    image: p1_img,
    new_price: 125000, 
    old_price: 170000, 
  },
  {
    id: 2,
    name: "Culottes",
    category: "women",
    image: p2_img,
    new_price: 78000,
    old_price: 111000,
  },
  {
    id: 3,
    name: "High Waist Pants",
    category: "women",
    image: p3_img,
    new_price:73000,
    old_price:98500,
  },
  {
    id: 4,
    name: "Jumpsuit",
    category: "women",
    image: p4_img,
    new_price:94500,
    old_price:103550,
  },
  {
    id: 5,
    name: "Blouse",
    category: "women",
    image: p5_img,
    new_price: 157000,
    old_price: 190000,
  },
  {
    id: 6,
    name: "oversized t-shirt",
    category: "women",
    image: p6_img,
    new_price: 78000,
    old_price: 97000,
  },
  {
    id: 7,
    name: "oversized hoodie",
    category: "women",
    image: p7_img,
    new_price: 280000,
    old_price: 310000,
  },
  {
    id: 8,
    name: "Blazer",
    category: "women",
    image: p8_img,
    new_price: 193000,
    old_price: 215000,
  },
  {
    id: 9,
    name: "Hotpants and Knit Vest",
    category: "women",
    image: p9_img,
    new_price: 174000,
    old_price: 230000,
  },
  {
    id: 10,
    name: "Blazer and Flared Pants Set",
    category: "women",
    image: p10_img,
    new_price: 320000,
    old_price: 397000,
  },
  {
    id: 11,
    name: "Highwaisted Culottes and Knit Vest",
    category: "women",
    image: p11_img,
    new_price: 310000,
    old_price: 378000,
  },
  {
    id: 12,
    name: "Dress Collar Neck",
    category: "women",
    image: p12_img,
    new_price: 83000,
    old_price: 107000,
  },
  {
    id: 13,
    name: "Knit Vest",
    category: "men",
    image: p13_img,
    new_price: 90000,
    old_price: 112000,
  },
  {
    id: 14,
    name: "Hoodie Denim",
    category: "men",
    image: p14_img,
    new_price: 210000,
    old_price: 250000,
  },
  {
    id: 15,
    name: "Striped shirt",
    category: "men",
    image: p15_img,
    new_price: 147000,
    old_price: 170000,
  },
  {
    id: 16,
    name: "Striped Long-Sleeve Shirt and Jeans",
    category: "men",
    image: p16_img,
    new_price: 28000,
    old_price: 350000,
  },
  {
    id: 17,
    name: "Jacket Boxy Canvas Outer Shirt Army",
    category: "men",
    image: p17_img,
    new_price: 138000,
    old_price: 187000,
  },
  {
    id: 18,
    name: "Varsity and Hodoie",
    category: "men",
    image: p18_img,
    new_price: 345000,
    old_price: 390000,
  },
  {
    id: 19,
    name: "Plain Cotton Shirt",
    category: "men",
    image: p19_img,
    new_price: 60000,
    old_price: 90000,
  },
  {
    id: 20,
    name: "puffer jacket",
    category: "men",
    image: p20_img,
    new_price: 130000,
    old_price: 185000,
  },
  {
    id: 21,
    name: "Coordinated Plain Shirt and Pants",
    category: "men",
    image: p21_img,
    new_price: 97000,
    old_price: 120000,
  },
  {
    id: 22,
    name: "Color Block Long Sleeve Sshirt",
    category: "men",
    image: p22_img,
    new_price: 87000,
    old_price: 100000,
  },
  {
    id: 23,
    name: "Striped shirt",
    category: "men",
    image: p23_img,
    new_price: 120000,
    old_price: 160000
  },
  {
    id: 24,
    name: "Oversized Tee",
    category: "men",
    image: p24_img,
    new_price: 93000,
    old_price: 102000,
  },
  {
    id: 25,
    name: "Blouse School",
    category: "kid",
    image: p25_img,
    new_price: 110000,
    old_price: 140000,
  },
  {
    id: 26,
    name: "Dakota Dress",
    category: "kid",
    image: p26_img,
    new_price: 140000,
    old_price: 160000,
  },
  {
    id: 27,
    name: "Casual summer outfit",
    category: "kid",
    image: p27_img,
    new_price: 280000,
    old_price: 178000,
  },
  {
    id: 28,
    name: "Boys Hooded Sweatshirt",
    category: "kid",
    image: p28_img,
    new_price: 73000,
    old_price: 98000,
  },
  {
    id: 29,
    name: "Cardinal Dress",
    category: "kid",
    image: p29_img,
    new_price: 150000,
    old_price: 108000,
  },
  {
    id: 30,
    name: "Littlefairy",
    category: "kid",
    image: p30_img,
    new_price: 172000,
    old_price: 212000,
  },
  {
    id: 31,
    name: "Dress Color",
    category: "kid",
    image: p31_img,
    new_price: 89000,
    old_price: 123000,
  },
  {
    id: 32,
    name: "Polo Shirt",
    category: "kid",
    image: p32_img,
    new_price: 73000,
    old_price: 91000,
  },
  {
    id: 33,
    name: "Striped Dress",
    category: "kid",
    image: p33_img,
    new_price: 60000,
    old_price: 83000,
  },
  {
    id: 34,
    name: "Dress Cream",
    category: "kid",
    image: p34_img,
    new_price: 90000,
    old_price: 111000,
  },
  {
    id: 35,
    name: "Boys Hooded Sweatshirtt",
    category: "kid",
    image: p35_img,
    new_price: 87000,
    old_price: 110000,
  },
  {
    id: 36,
    name: "Sweater",
    category: "kid",
    image: p36_img,
    new_price: 95000,
    old_price: 123000,
  },
];

export default all_product;
