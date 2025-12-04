export default function RoomCard({ title, description, thumbnail, embedUrl, priceBTC, btcpayInvoice }) {
  const [showEmbed, setShowEmbed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden transition duration-300 hover:bg-gray-600">
      {!showEmbed ? (
        <div onClick={() => setShowEmbed(true)} className="cursor-pointer">
          <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold text-red-500">{title}</h3>
            <p className="text-gray-300">{description}</p>
            <p className="mt-2 text-yellow-400 font-semibold">Price: {priceBTC} BTC</p>
            <p className="mt-2 text-sm text-gray-400">Click to preview video</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-48">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            allowFullScreen
            className="rounded-lg"
            title={title}
          ></iframe>
        </div>
      )}

      {/* Request Access Button */}
      <div className="p-4">
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Request Access
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white font-bold">✕</button>
            <h2 className="text-2xl font-bold text-red-500 mb-4">{title}</h2>
            <p className="text-gray-300 mb-4">{description}</p>
            <p className="text-yellow-400 font-semibold mb-4">Price: {priceBTC} BTC</p>

            <h3 className="text-xl text-white font-bold mb-2">Choose Payment Method:</h3>
            <div className="flex flex-col gap-3">
              {/* BTC Payment */}
              <a href={btcpayInvoice} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded text-center">
                Pay with BTC
              </a>

              {/* Alternative Payment */}
              <a href="https://t.me/YourTelegram" target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center">
                Pay via Alternative Method
              </a>
            </div>

            <p className="text-gray-400 text-sm mt-4">
              After payment, send your proof along with the Room title on Telegram for instant access.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
