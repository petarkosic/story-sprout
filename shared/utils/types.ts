export type Story = {
	story_id: number;
	story_headline: string;
	rating: number | null;
	user_id?: number | null;
	first_name?: string | null;
	last_name?: string | null;
	number_of_contributions: number;
};

export type Sentence = {
	sentence_id: number;
	story_id: number;
	parent_sentence_id: number;
	content: string;
	created_at: Date;
	story_headline: string;
	rating: number;
	children?: Sentence[];
	user_id: number;
	first_name: string;
	last_name: string;
	email: string;
	registered_at: Date;
};

export type NewSentence = Pick<
	Sentence,
	'story_id' | 'sentence_id' | 'content' | 'user_id'
>;

export type Error = {
	message: string;
};

export type User = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};
