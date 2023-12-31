const express = require('express');
const { User, Nfts, Series, User_nfts } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const responseData = {
        type0: [],
        type1: [],
        type2: [],
    };
    const { account } = req.query;
    try {
        // find User 후
        const findUser = await User.findOne({
            where: { account: account },
        });
        responseData.user = findUser;
        // User가 가지고 있는 Series 조회 후
        const findSeries = await findUser.getSeries();
        //console.log(findSeries[0].dataValues.id);
        // 각 Series별 Nft도 조회

        if (findSeries) {
            let idx = 0;
            const promises = findSeries.map(async (series) => {
                // 이 중에서 User가 NFT를 가졌는지 제대로 확인.
                const findNfts = await Nfts.findAll({
                    where: { seriesId: series.id },
                    include: [
                        {
                            model: User,
                            where: { id: findUser.id },
                            through: { model: User_nfts, attributes: ['transactionHash'] }, // M:N 관계의 through 테이블
                            attributes: [], // User에 관한 추가 정보는 필요 없으므로 속성을 비워둡니다.
                        },
                    ],
                });

                const pushData = {
                    data: [
                        {
                            name: findSeries[idx].boardName,
                            image: findSeries[idx].boardImage,
                            description: findSeries[idx].boardDescription,
                            attributes: [
                                {
                                    trait_type: 'Series',
                                    value: findSeries[idx].id,
                                },
                            ],
                        },
                        ...findNfts.map((nft) => {
                            //console.log(nft);
                            return {
                                name: nft.name,
                                image: nft.image,
                                description: nft.description,
                                transactionHash: nft.transactionHash,
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
                    baseURI: findSeries[idx].baseURI,
                    seriesInfo: {
                        series: findSeries[idx].id,
                        title: findSeries[idx].title,
                        benefit: findSeries[idx].benefit,
                        description: findSeries[idx].description,
                        quantity: findSeries[idx].quantity,
                        ticketType: findSeries[idx].ticketType,
                        owner: findSeries[idx].owner,
                        useWhere: findSeries[idx].useWhere,
                        useWhenFrom: findSeries[idx].useWhenFrom,
                        useWhenTo: findSeries[idx].useWhenTo,
                        applyCount: findSeries[idx].applyCount,
                    },
                };

                const ticketType = findSeries[idx].ticketType;
                if (ticketType === 0) {
                    responseData.type0.push(pushData);
                } else if (ticketType === 1) {
                    responseData.type1.push(pushData);
                } else if (ticketType === 2) {
                    responseData.type2.push(pushData);
                }
                idx++;
            });
            // 이후 해당 정보들을 포매팅해서 전송
            await Promise.all(promises);
            res.status(200).json(responseData);
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({
            log: 'getUser error',
        });
    }
});

module.exports = router;
