import React, { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function EditPage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setBio(data.bio || "");
        }
      }
    });
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "Users", user.uid);

    if (avatar) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const avatarBase64 = reader.result;
        await updateDoc(userRef, {
          name,
          bio,
          avatar: avatarBase64,
        });
        navigate("/profile");
      };
      reader.readAsDataURL(avatar);
    } else {
      await updateDoc(userRef, {
        name,
        bio,
      });
      navigate("/profile");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="bg-darkGrey p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New Username"
            className="w-full bg-bgGrey border border-gray-600 rounded-lg px-3 py-2 text-white"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Your bio"
            className="w-full bg-bgGrey border border-gray-600 rounded-lg px-3 py-2 text-white resize-none"
            rows={3}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="w-full bg-bgGrey border border-gray-600 rounded-lg px-3 py-2 text-white"
          />
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition-colors duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export { EditPage };