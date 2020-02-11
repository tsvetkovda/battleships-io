import generate from 'nanoid/generate';

const generateRoomId = (): string => generate('0123456789', 5);

export default generateRoomId;
