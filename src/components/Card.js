export default class Card {
	constructor(
		data,
		userId,
		cardSelector,
		handleCardClick,
		handleLikeClick,
		handleDeleteIconClick
	) {
		this._data = data;
		this._title = data.name;
		this._link = data.link;
		this._owner = data.owner;
		this._likes = data.likes;
		this._id = data._id;
		this._userId = userId;
		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
		this._handleLikeClick = handleLikeClick;
		this._handleDeleteIconClick = handleDeleteIconClick;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._cardSelector)
			.content.querySelector(".place")
			.cloneNode(true);

		return cardElement;
	}

	_isLike(data) {
		return data.likes.some((like) => {
			return like._id === this._userId;
		});
	}

	_showLike() {
		if (this._isLike(this._data)) {
			this._likeButton.classList.toggle("place__like-button_active");
		}
	}

	_isOwner() {
		if (this._userId !== this._owner._id) {
			this._deleteButton.remove();
		}
	}

	_setEventListeners() {
		this._likeButton.addEventListener("click", () => {
			this._handleLikeClick(
				this._likeButton,
				this._id,
				this._likes,
				this._likeCounter
			);
		});

		this._cardImage.addEventListener("click", () => {
			this._handleCardClick(this._link, this._title);
		});

		this._deleteButton.addEventListener("click", () => {
			this._handleDeleteIconClick(this._id);
		});
	}

	generateCard() {
		this._cardElement = this._getTemplate();
		this._cardImage = this._cardElement.querySelector(".place__image");
		this._cardImage.src = this._link;
		this._cardImage.alt = this._title;
		this._cardElement.querySelector(".place__title").textContent = this._title;

		this._likeButton = this._cardElement.querySelector(".place__like-button");
		this._likeCounter = this._cardElement.querySelector(".place__like-counter");
		this._likeCounter.textContent = this._likes.length;
		this._deleteButton = this._cardElement.querySelector(
			".place__delete-button"
		);
		this._showLike();
		this._isOwner();
		this._setEventListeners();

		return this._cardElement;
	}
}
