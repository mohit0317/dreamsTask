import { useState } from "react";
import { Card, Button, Container, Row, Col, ProgressBar } from "react-bootstrap";

const cardsData = [
    {
        id: 1,
        image: "https://via.placeholder.com/150",
        details: { cost: 5, level: 1, rent: 2, time: 3 },
    },
    {
        id: 2,
        image: "https://via.placeholder.com/150",
        details: { cost: 10, level: 2, rent: 3, time: 6 },
    },
    {
        id: 3,
        image: "https://via.placeholder.com/150",
        details: { cost: 15, level: 3, rent: 4, time: 9 },
    },
    {
        id: 4,
        image: "https://via.placeholder.com/150",
        details: { cost: 20, level: 4, rent: 5, time: 12 },
    },
    {
        id: 5,
        image: "https://via.placeholder.com/150",
        details: { cost: 25, level: 5, rent: 6, time: 15 },
    },
    {
        id: 6,
        image: "https://via.placeholder.com/150",
        details: { cost: 30, level: 6, rent: 7, time: 18 },
    },
    {
        id: 7,
        image: "https://via.placeholder.com/150",
        details: { cost: 35, level: 7, rent: 8, time: 21 },
    },
    {
        id: 8,
        image: "https://via.placeholder.com/150",
        details: { cost: 40, level: 8, rent: 9, time: 24 },
    },
    {
        id: 9,
        image: "https://via.placeholder.com/150",
        details: { cost: 45, level: 9, rent: 10, time: 27 },
    },
    {
        id: 10,
        image: "https://via.placeholder.com/150",
        details: { cost: 50, level: 10, rent: 11, time: 30 },
    },
];

const CardsComponent = () => {

    const [mappedCardData, setMappedCardData] = useState(cardsData);

    const [boughtCards, setBoughtCards] = useState({});
    const [walletAmount, setWalletAmount] = useState(100);
    const [progress, setProgress] = useState({});


    const handleBuy = (id, cost, rent, level, time) => {
        if (walletAmount >= cost) {
            setWalletAmount((prev) => prev - cost);
            setBoughtCards((prev) => ({ ...prev, [id]: true }));

            setMappedCardData((prev) =>
                prev?.map((card) =>
                    card.id === id
                        ? {
                            ...card,
                            details: {
                                ...card.details,
                                level: card.details.level + 1,
                                cost: card.details.cost * 1.5
                            }
                        }
                        : card
                )
            );
        } else {
            alert(`Not enough funds to buy Card ${id}. Cost: $${cost}, Available: $${walletAmount}`);
        }
    };


    const handleManage = (id, rent, level, time) => {
        const manageCost = rent * 20;

        if (walletAmount >= manageCost) {
            setWalletAmount((prev) => prev - manageCost);
            setBoughtCards((prev) => ({ ...prev, [id]: true }));

            const progressUpdate = () => {
                let progressValue = 0;
                const interval = setInterval(() => {
                    progressValue += 100 / time;
                    setProgress((prev) => ({ ...prev, [id]: progressValue }));

                    if (progressValue >= 100) {
                        clearInterval(interval);
                        setWalletAmount((prev) => prev + rent * level);
                        progressUpdate();
                    }
                }, 1000);
            };

            progressUpdate();

            alert(`Card ${id} managed successfully! Deducted $${manageCost} from wallet.`);
        } else {
            alert(`Not enough funds to manage Card ${id}. Required: $${manageCost}, Available: $${walletAmount}`);
        }
    };


    const handleRent = (id, rent, level, time) => {
        const profit = rent * level;
        setWalletAmount((prev) => prev + profit);
        setProgress((prev) => ({ ...prev, [id]: 0 }));
        let progressValue = 0;
        const interval = setInterval(() => {
            progressValue += 100 / time;
            setProgress((prev) => ({ ...prev, [id]: progressValue }));

            if (progressValue >= 100) {
                clearInterval(interval);
            }
        }, 1000);

        alert(`You earned $${profit} from Card ${id}!`);
    };

    const handleWalletSave = () => {
        alert(`Wallet Amount Saved: $${walletAmount}`);
    };

    return (
        <Container className="mt-4 p-3 border border-danger rounded">

            <Card className="mb-3 border border-success p-3">
                <Card.Body className="d-flex justify-content-between align-items-center">
                    <h5>Total Wallet Amount: {walletAmount} </h5>
                    <Button variant="primary" onClick={handleWalletSave}>Save</Button>
                </Card.Body>
            </Card>

            <Row className="g-3">
                {mappedCardData?.map((card) => (
                    <Col key={card.id} md={12}>
                        <Card className="d-flex flex-row align-items-center border border-success p-3">
                            <div className="text-center me-3">
                                <Card.Img
                                    variant="top"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdVodJp1x46ILECKvW3SaXS_sbicr9QiNZRA&s"
                                    style={{ width: "170px", height: "170px", borderRadius: "10px" }}
                                />
                                <Card.Text className="mt-2 fw-bold">Green House</Card.Text>
                            </div>
                            <Card.Body className="d-flex flex-column w-100">

                                <div className="mb-2">
                                    <Card.Title>Card {card.id}</Card.Title>
                                    <Card.Text>
                                        <strong>Cost:</strong> ${card.details.cost} <br />
                                        <strong>Level:</strong> {card.details.level} <br />
                                        <strong>Rent:</strong> {card.details.rent} <br />
                                        <strong>Time:</strong> {card.details.time}
                                    </Card.Text>
                                </div>
                                {boughtCards[card.id] && (
                                    <ProgressBar now={progress[card.id] || 0} label={`${Math.round(progress[card.id] || 0)}%`} className="mb-2" />
                                )}
                                <div className="d-flex align-items-center">
                                    {!boughtCards[card.id] ? (
                                        <Button variant="primary" onClick={() => handleBuy(card.id, card.details.cost, card.details.rent, card.details.level, card.details.time)}>
                                            Buy
                                        </Button>
                                    ) : (
                                        <>
                                            <Button variant="primary" className="me-2" onClick={() => handleBuy(card.id, card.details.cost, card.details.rent, card.details.level, card.details.time)}>
                                                Buy
                                            </Button>
                                            <Button variant="success" className="me-2" onClick={() => handleRent(card.id, card.details.rent, card.details.level, card.details.time)}>
                                                Rent
                                            </Button>
                                            <Button variant="warning" onClick={() => handleManage(card.id, card.details.rent, card.details.level, card.details.time)}>
                                                Manage
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CardsComponent;
