// Посчитайте сколько раз можно вызвать функцию document.write() внутри document.write(). Объясните результат.

//  В статье на хабре написано что document.write для chrome можно вызвать 21 раз, для firefox 20
//

document.write(
	document.write(
		document.write(
			document.write(
				document.write(
					document.write(
						document.write(
							document.write(
								document.write(
									document.write(
										document.write(
											document.write(
												document.write(
													document.write(
														document.write(
															document.write(
																document.write(
																	document.write(
																		document.write(
																			document.write(
																				document.write(
																					document.write(
																						document.write(
																							document.write(document.write())
																						)
																					)
																				)
																			)
																		)
																	)
																)
															)
														)
													)
												)
											)
										)
									)
								)
							)
						)
					)
				)
			)
		)
	)
) // 25 вызовов и можно вставлять ещё больше

// Каждый вызов вставляет на страницу undefined и либо предел в (21) увеличился, либо я не совсем правильно понял как document.write вызывать в document.write
