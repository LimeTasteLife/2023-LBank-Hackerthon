export const mintDataNFT = ({ data, id }: any) => {
  // console.log('image array', data.imageSrc[1])

  return {
    seriesInfo: {
      series: Number(data.series) * 10,
      ticketType: 0,
      title: data.title.toString(),
      benefit: data.benefit.toString(),
      owner: data.owner.toString(),
      useWhere: data.useWhere.toString(),
      useWhenFrom: data.useWhenFrom.toString(),
      useWhenTo: data.useWhenTo.toString(),
      description: data.description.toString(),
      quantity: data.quantity,
    },
    data: [
      {
        name: `Series ${data.series} NFT Ticket`,
        image: data.imageSrc[0],
        description: data.stampBoardDesc.toString(),
        attributes: [
          {
            trait_type: 'Latitude',
            value: data.firstStampLat,
          },
          {
            trait_type: 'Longitude',
            value: data.firstStampLot,
          },
          {
            trait_type: 'Address',
            value: data.firstStampAddress,
          },
          {
            trait_type: 'Series',
            value: data.series,
          },
        ],
      },
    ],
  };
};

// lat: data.thirdStampLat,
// lng: data.thirdStampLot,
// place: data.thirdStampAddress,
// series: data.series,
