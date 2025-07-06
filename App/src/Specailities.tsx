import Gyn from './assets/images/gynecologist.png'
import Dermatologist  from './assets/images/dermatologist.png'
import Pediatrics from './assets/images/pediatrics.png'
import Orthopedic from './assets/images/orthopedics.png'
import ENT from './assets/images/ENT.png'
import Diabetologist from './assets/images/Diabetologist.png'
import Eye from './assets/images/eye.png'

type Data = {
  id: number;
  spec: string;
  img: string | undefined;
  shadowColor: string;
  text: string;
  pageLink: string
};

export const specialities: Array<Data> = [
  {
    id: 1,
    spec: 'Gynecologist',
    img: Gyn,
    shadowColor: 'pink',
    text: 'We recommend trusted gynecologists based on expertise and patient satisfaction.',
    pageLink:"/Gynecologist"
  },
  {
    id: 2,
    spec: 'Dermatologist',
    img: Dermatologist,
    shadowColor: '#E8C999',
    text: 'Get recommendations for dermatologists who provide expert skin care and treatment.',
    pageLink:"/Dermatologist"
  },
  {
    id: 3,
    spec: 'Pediatrician',
    img: Pediatrics,
    shadowColor: '#547792',
    text: 'Trusted pediatricians specialized in child healthcare and wellbeing.',
    pageLink:"/Pediatrician"
  },
  {
    id: 4,
    spec: 'Orthopedic',
    img: Orthopedic,
    shadowColor: '#210F37',
    text: 'Find orthopedic doctors for bone, joint, and muscle health.',
    pageLink:"/Orthopedic"
  },
  {
    id: 5,
    spec: 'ENT',
    img: ENT,
    shadowColor: '#EF9651',
    text: 'Top ENT specialists for ear, nose, and throat conditions.',
    pageLink:"/ENT"
  },
  {
    id: 6,
    spec: 'Diabetologist',
    img: Diabetologist,
    shadowColor: '#4D55CC',
    text: 'Expert care for managing diabetes and related metabolic disorders.',
    pageLink:"/Diabetologist"
  },
  {
    id: 7,
    spec: 'Eye Specialist',
    img: Eye,
    shadowColor: '#007074',
    text: 'Recommended eye specialists for vision correction and eye health.',
    pageLink:"/Eye"
  },
];
