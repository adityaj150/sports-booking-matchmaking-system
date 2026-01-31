import { useState } from "react";

const FeedbackModal = ({ isOpen, onClose, onSubmit, targetPlayerName }) => {
    const [rating, setRating] = useState(0);
    const [reliability, setReliability] = useState(0);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating === 0) {
            alert("Please select a rating");
            return;
        }
        onSubmit({ rating, reliability });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-dark-card border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>

                <h3 className="text-xl font-bold text-center text-white mb-2">Rate Your Match</h3>
                <p className="text-gray-400 text-center text-sm mb-6">
                    How was playing with <span className="text-neon">{targetPlayerName || "your opponent"}</span>?
                </p>

                {/* Skill Rating */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2 text-center">Skill Rating</label>
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-3xl transition-transform hover:scale-110 ${star <= rating ? "text-neon drop-shadow-lg" : "text-gray-600"
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-2">
                        {rating === 1 && "Newbie"}
                        {rating === 2 && "Casual"}
                        {rating === 3 && "Good"}
                        {rating === 4 && "Pro"}
                        {rating === 5 && "Legend"}
                    </p>
                </div>

                {/* Reliability Rating */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-300 mb-2 text-center">Reliability</label>
                    <div className="flex justify-center gap-4">
                        {[1, 5].map((val) => (
                            <button
                                key={val}
                                onClick={() => setReliability(val)}
                                className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${reliability === val
                                        ? "bg-white text-black border-white"
                                        : "bg-transparent text-gray-400 border-gray-600 hover:border-gray-400"
                                    }`}
                            >
                                {val === 1 ? "👎 Flaky" : "👍 Reliable"}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-neon text-black font-bold py-3 rounded-lg hover:bg-neon/90 hover:scale-[1.02] transition-all"
                >
                    Submit Feedback
                </button>
            </div>
        </div>
    );
};

export default FeedbackModal;
