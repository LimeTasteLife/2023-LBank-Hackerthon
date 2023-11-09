// NAVIGATION
export const NAV_LINKS = [
  { href: '/', key: 'home', label: 'Home' },
  { href: '/Minting', key: 'Minting', label: 'Minting' },
  { href: '/Series', key: 'Series', label: 'Series' },
  { href: '/MyNFT', key: 'MyNFT ', label: 'MyNFT ' },
  { href: '/transferNFT', key: 'transferNFT', label: 'TransferNFT' },
];

// CAMP SECTION
export const PEOPLE_URL = [
  '/lendingPage/person-1.png',
  '/lendingPage/person-2.png',
  '/lendingPage/person-3.png',
  '/lendingPage/person-4.png',
];

// FEATURES SECTION
export const FEATURES = [
  {
    title: '위조 방지',
    icon: '/lendingPage/forgery.svg',
    variant: 'green',
    description:
      'NFT와 IPFS 기술을 통해 여러분들이 갖고 있는 스탬프의 기회비용은 안전하게 유지 됩니다. 그 누구도 여러분이 갖고 있는 NFT를 조작하거나 뺏지 못합니다. 오롯히 여러분들만이 가진 스탬프 NFT로서 유일무이한 가치를 가집니다. ',
  },
  {
    title: '안전하고 편리한 가치',
    icon: '/lendingPage/transaction.svg',
    variant: 'green',
    description:
      '여러분들이 가지고 있는 모든 NFT 들은 안전하게 지갑과 블록체인에 저장됩니다. 여러분들은 그저 비밀번호만 잘 알고 있다면 다른 걱정은 할 필요가 없습니다. 비밀번호만 알고 있다면 언제 어디서든지 자신의 NFT들을 확인하고 검증할 수 있습니다.',
  },
  {
    title: '투명성 및 불법적 행위 방지',
    icon: '/lendingPage/confirm.svg',
    variant: 'green',
    description:
      '이 NFT 스탬프 이벤트에서 발생되는 모든 정보는 탈중앙적으로 이루어져 데이터 소실 및 조작의 위험을 최소화하면서도, 관리는 (신뢰도 높은) 중앙 주체에서 이루어지는 만큼 스탬프를 거짓된 방법으로 얻는 것은 거의 불가능 합니다. 확실한 행위 인증만이 유일하게 NFT를 받고 스탬프를 찍을 수 있고, 모든 과정은 블록체인 위에 투명하게 저장됩니다. 이는 기존 티켓 서비스가 갖고 있는 사재기, 거짓 정보로 인증, 뒷거래 등을 효과적으로 차단합니다.',
  },
  {
    title: '거래 가능',
    icon: '/lendingPage/tech.svg',
    variant: 'orange',
    description:
      '세계에서 가장 큰 NFT 거래소인 Opensea의 표준에 맞춘 NFT로서 Opensea에서 자신의 NFT를 확인할 수 있습니다. 그리고 Opensea를 포함한 NFT 마켓에서 자신이 갖고 있는 NFT를 팔거나 원하는 NFT를 구매할 수 있습니다. 만약 자신의 NFT가 인천시의 어떤 행사 티켓으로 사용될 수 있다면 그 가치는 훨씬 커질 수 있습니다.',
  },
];

// FOOTER SECTION
export const FOOTER_LINKS = [
  {
    title: 'Learn More',
    links: [
      'About dNFT',
      'ERC 1155',
      'IPFS',
      'Jobs',
      'Privacy Policy',
      'Contact Us',
    ],
  },
  {
    title: 'Our Community',
    links: ['Blockchain at Yonsei', 'LBANK', 'Polygon'],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: 'Contact Us',
  links: [
    { label: 'Admin Officer', value: '123-456-7890' },
    { label: 'Email Officer', value: 'dNFTwithLBANK.com' },
  ],
};

export const SOCIALS = {
  title: 'Social',
  links: [
    '/lendingPage/facebook.svg',
    '/lendingPage/instagram.svg',
    '/lendingPage/twitter.svg',
    '/lendingPage/youtube.svg',
    '/lendingPage/wordpress.svg',
  ],
};

export const IncheonSeriesExample = [
  { label: '강화군청', lat: 37.7466294, lng: 126.4878771 },
  { label: '광성보', lat: 37.664987, lng: 126.5300939 },
  { label: '동막해수욕장', lat: 37.5925761, lng: 126.4581875 },
  { label: '보문사', lat: 37.68862319999999, lng: 126.3219046 },
];

export const Step = [
  {
    id: 'world-1',
    imgUrl: '/lendingPage/walletLogin.png',
    title: '지갑으로 간편 로그인',
    desc: 'Web3 wallet 만 있다면 별도의 회원가입 없이 쉽고 빠르게 로그인할 수 있습니다.'
  },
  {
    id: 'world-2',
    imgUrl: '/NFTImages/search.png',
    title: '진행중인 시리즈 둘러보기',
    desc: 'Series 페이지에서 현재 진행중인 Series를 확인하세요. NFT 수량은 정해져 있는 만큼 빠른 선점이 필요할 수 있습니다.'
  },
  {
    id: 'world-3',
    imgUrl: '/NFTImages/apply.png',
    title: '원하는 시리즈 선택 후 스템프 보드 NFT 및 스템프 NFT 받기',
    desc: '자신이 하고 싶은 Series를 빠르게 선택하고 도장(스탬프) NFT를 찍을 스템프 보드 NFT를 받으세요. 그리고 각각의 스템프 NFT를 받기 위한 조건(위치 및 유효기간)을 확인하세요.'
  },
  {
    id: 'world-4',
    imgUrl: '/realCheck.png',
    title: '미션 수행하면서 스탬프 NFT 받기',
    desc: '미션을 수행했다면 Burrito Wallet 또는 SNS 를 통해 행위인증을 진행하세요. Burrito Wallet에 접속 후 You Jun 에게 본인의 얼굴과 해당 위치를 식별할 수 있는 장소에서 찍은 사진과 함께 지갑 주소를 메세지를 보내는 것이 행위 인증의 전부입니다.'
  },
  {
    id: 'world-5',
    imgUrl: '/benefit.png',
    title: '준비된 또는 뜻밖의 혜택 받기',
    desc: '행위 인증이 인정받게 되면 도장 NFT를 받게되고 MyNFT에서 스탬프 보드 NFT 위에 찍혀 있는 NFT을 확인 할 수 있습니다! 이제 이 NFT는 예정된 또는, 뜻밖의 혜택을 받을 수 있는 티켓이 됩니다.'
  },
];

export const ExampleSeries = {
  seriesInfo: {
    title: '강화도 맛집 탐방 시리즈~',
    series: 1,
    benefit: '지역문화 상품권 10000원',
    description:
      '강화도에 있는 다양한 맛집과 문하재를 탐방하면서 스탬프를 찍어오는 이벤트',
    useWhere: '인천 가락시작',
    owner: 'YouJun',
    useWhenFrom: 'Thu Oct 26 2023 00:00:00 GMT+0900 (Korean Standard Time)',
    useWhenTo: 'Thu Oct 26 2023 00:00:00 GMT+0900 (Korean Standard Time)',
  },
  '0': {
    name: 'Series 1 Stamp Board',
    image:
      '',
    description: '첫번째 인천 스탬프 NFT 시리즈의 도장판',
    quantity: 10,
    series: 1,
  },
  '1': {
    name: 'Series 1 Stamp 1',
    image:
      '',
    description: '첫번째 인천 스탬프 NFT 시리즈의 도장',
    quantity: 10,
    lat: 37.2345,
    lng: 126.5334,
    place: '인천광역시 강화군 보문사',
    series: 1,
  },
  '2': {
    name: 'Series 1 Stamp 2',
    image:
      '',
    description: '첫번째 인천 스탬프 NFT 시리즈의 도장',
    quantity: 10,
    lat: 37.2345,
    lng: 126.5334,
    place: '인천광역시 강화군 보문사',
    series: 1,
  },
  '3': {
    name: 'Series 1 Stamp 3',
    image:
      '',
    description: '첫번째 인천 스탬프 NFT 시리즈의 도장',
    quantity: 10,
    lat: 37.2345,
    lng: 126.5334,
    place: '인천광역시 강화군 보문사',
    series: 1,
  },
  '4': {
    name: 'Series 1 Stamp 4',
    image:
      '',
    description: '첫번째 인천 스탬프 NFT 시리즈의 도장',
    quantity: 10,
    lat: 37.2345,
    lng: 126.5334,
    place: '인천광역시 강화군 보문사',
    series: 1,
  },
};


export const testUser = [
  {
      "id": 2,
      "account": "0x435c7fAE3C33Bab84FF032A7af1ca531aeD2B2e7",
      "name": null,
      "email": null,
      "image": null,
      "createdAt": "2023-10-30T02:44:12.000Z",
      "updatedAt": "2023-10-30T02:44:12.000Z",
      "deletedAt": null
  },
  {
      "data": [
          {
              "name": "Series 1 Stamp Board",
              "image": "https://res.cloudinary.com/dhtq54adh/image/upload/v1698513934/%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8_%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7-5_rzlxlp.png",
              "description": "aaaa",
              "attributes": [
                  {
                      "trait_type": "Series",
                      "value": 290
                  }
              ]
          },
          {
              "name": "Series 1 Stamp 3",
              "image": "https://res.cloudinary.com/dhtq54adh/image/upload/v1698513940/incheon1_ukgwtg.jpg",
              "description": "nnnn",
              "attributes": [
                  {
                      "trait_type": "Latitude",
                      "value": "37.4631505"
                  },
                  {
                      "trait_type": "Longtitude",
                      "value": "126.4474815"
                  },
                  {
                      "trait_type": "Address",
                      "value": "대한민국 인천광역시 중구 공항로 인천국제공항 (ICN)"
                  },
                  {
                      "trait_type": "Series",
                      "value": "1"
                  }
              ]
          }
      ],
      "baseURI": "https://c6b8e7180c3c42db758973559ad7f50d.ipfscdn.io/ipfs/QmbJvDptQstq75CwLTRuBXnvfDNqgjJZWdtDxN7y8eHSuQ",
      "seriesInfo": {
          "series": 290,
          "title": "pppp",
          "benefit": "oooo",
          "description": "yyyy",
          "quantity": 20,
          "owner": "0x12345",
          "useWhere": "uuuu",
          "useWhenFrom": "2023-10-29T15:00:00.000Z",
          "useWhenTo": "2023-10-30T15:00:00.000Z",
          "applyCount": 1
      }
  }
]
