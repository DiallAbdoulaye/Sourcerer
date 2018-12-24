import gql from 'graphql-tag'

export const USER_GET = gql`
	query {
		viewer {
			name
			followers {
				totalCount
			}
			following {
				totalCount
			}
		}
	}
`

export const USER_GET_REPO = gql`
	query($cursor: String, $login: String!) {
		user(login: $login) {
			name
			repositories(first: 1, privacy: PUBLIC, after: $cursor) {
				totalCount
				nodes {
					name
					primaryLanguage {
						name
						color
					}
					defaultBranchRef {
						target {
							... on Commit {
								history {
									nodes {
										additions
										deletions
									}
									totalCount
								}
							}
						}
					}
				}
				pageInfo {
					hasNextPage
					endCursor
				}
			}
		}
	}
`
