<?php

namespace JuristBundle\Entity;

/**
 * UserModefieded
 */
class UserModefieded
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $AuthUserId;

    /**
     * @var integer
     */
    private $idAuthUser;

    /**
     * @var \DateTime
     */
    private $date;

    /**
     * @var integer
     */
    private $questionIdModefieded;

    /**
     * @var integer
     */
    private $authorIdModefieded;

    /**
     * @var integer
     */
    private $answersIdModefieded;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set idAuthUser
     *
     * @param integer $idAuthUser
     *
     * @return UserModefieded
     */
    public function setIdAuthUser($idAuthUser)
    {
        $this->idAuthUser = $idAuthUser;

        return $this;
    }

    /**
     * Get idAuthUser
     *
     * @return integer
     */
    public function getIdAuthUser()
    {
        return $this->idAuthUser;
    }

    /**
     * Set AuthUserId
     *
     * @param integer $AuthUserId
     *
     * @return UserModefieded
     */
    public function setAuthUserId($AuthUserId)
    {
        $this->AuthUserId = $AuthUserId;

        return $this;
    }

    /**
     * Get AuthUserId
     *
     * @return integer
     */
    public function getAuthUserId()
    {
        return $this->AuthUserId;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return UserModefieded
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set questionIdModefieded
     *
     * @param integer $questionIdModefieded
     *
     * @return UserModefieded
     */
    public function setQuestionIdModefieded($questionIdModefieded)
    {
        $this->questionIdModefieded = $questionIdModefieded;

        return $this;
    }

    /**
     * Get questionIdModefieded
     *
     * @return integer
     */
    public function getQuestionIdModefieded()
    {
        return $this->questionIdModefieded;
    }

    /**
     * Set authorIdModefieded
     *
     * @param integer $authorIdModefieded
     *
     * @return UserModefieded
     */
    public function setAuthorIdModefieded($authorIdModefieded)
    {
        $this->authorIdModefieded = $authorIdModefieded;

        return $this;
    }

    /**
     * Get authorIdModefieded
     *
     * @return integer
     */
    public function getAuthorIdModefieded()
    {
        return $this->authorIdModefieded;
    }

    /**
     * Set answersIdModefieded
     *
     * @param integer $answersIdModefieded
     *
     * @return UserModefieded
     */
    public function setAnswersIdModefieded($answersIdModefieded)
    {
        $this->answersIdModefieded = $answersIdModefieded;

        return $this;
    }

    /**
     * Get answersIdModefieded
     *
     * @return integer
     */
    public function getAnswersIdModefieded()
    {
        return $this->answersIdModefieded;
    }
}

