export type Sentence = {
	sentence_id: number;
	story_id: number;
	parent_sentence_id: number;
	content: string;
	created_at: Date;
	story_headline: string;
	rating: number;
	children?: Sentence[];
};

export type Error = {
	message: string;
};

export type User = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};
