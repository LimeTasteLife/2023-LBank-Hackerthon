const express = require('express');
const { Series, Nfts } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const { account } = req.query;
    const responseData = {
        type0: [],
        type1: [],
        type2: [],
    };
    try {
        for (let i = 0; i < 3; i++) {
            const findSeriesAll = await Series.findAll({
                where: { ticketType: i, owner: account },
                order: [['id', 'DESC']],
            });

            //console.log(findSeriesAll);

            let idx = 0;
            const promises = findSeriesAll.map(async (series) => {
                const findNftsAll = await Nfts.findAll({
                    where: { seriesId: findSeriesAll[idx].id },
                });

                const pushData = {
                    data: [
                        {
                            name: findSeriesAll[idx].boardName,
                            image: findSeriesAll[idx].boardImage,
                            description: findSeriesAll[idx].boardDescription,
                            attributes: [
                                {
                                    trait_type: 'Series',
                                    value: findSeriesAll[idx].id,
                                },
                            ],
                        },
                        ...findNftsAll.map((nft) => {
                            return {
                                name: nft.name,
                                image: nft.image,
                                description: nft.description,
                                attributes: [
                                    {
                                        trait_type: 'Latitude',
                                        value: nft.latitude,
                                    },
                                    {
                                        trait_type: 'Longtitude',
                                        value: nft.longtitude,
                                    },
                                    {
                                        trait_type: 'Address',
                                        value: nft.address,
                                    },
                                    {
                                        trait_type: 'Series',
                                        value: nft.boardTraitSeries,
                                    },
                                ],
                            };
                        }),
                    ],
                    baseURI: findSeriesAll[idx].baseURI,
                    seriesInfo: {
                        series: findSeriesAll[idx].id,
                        title: findSeriesAll[idx].title,
                        benefit: findSeriesAll[idx].benefit,
                        owner: findSeriesAll[idx].owner,
                        useWhere: findSeriesAll[idx].useWhere,
                        useWhenFrom: findSeriesAll[idx].useWhenFrom,
                        useWhenTo: findSeriesAll[idx].useWhenTo,
                        description: findSeriesAll[idx].description,
                        ticketType: findSeriesAll[idx].ticketType,
                        quantity: findSeriesAll[idx].quantity,
                        applyCount: findSeriesAll[idx].applyCount,
                    },
                };

                responseData['type' + i].push(pushData);
                idx++;
            });
            await Promise.all(promises);
        }

        res.status(200).json(responseData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
