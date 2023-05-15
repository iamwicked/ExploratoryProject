import React, { useState } from "react";
import '../App.css'

const Packet = ({ id, seqNum, ackNum }) => (
  <div key={id} className="packet">
    <span>Packet {seqNum}</span>
    <span>Ack {ackNum}</span>
  </div>
);

const SlidingWindow = ({ windowSize }) => {
  const [baseSeqNum, setBaseSeqNum] = useState(0);
  const [packets, setPackets] = useState([]);

  const sendPacket = () => {
    const nextSeqNum = baseSeqNum + packets.length;
    const packet = { id: nextSeqNum, seqNum: nextSeqNum, ackNum: null };
    setPackets([...packets, packet]);
  };

  const receiveAck = (ackNum) => {
    if (ackNum >= baseSeqNum && ackNum < baseSeqNum + windowSize) {
      const numPacketsAcked = ackNum - baseSeqNum + 1;
      setBaseSeqNum(baseSeqNum + numPacketsAcked);
      setPackets(packets.slice(numPacketsAcked));
    }
  };

  return (
    <div className="sliding-window">
      <div className="window">
        {packets.map((packet) => (
          <Packet {...packet} />
        ))}
      </div>
      <div className="buttons">
        <button onClick={sendPacket}>Send Packet</button>
        <button onClick={() => receiveAck(baseSeqNum)}>Receive ACK</button>
      </div>
    </div>
  );
};

export default SlidingWindow;
